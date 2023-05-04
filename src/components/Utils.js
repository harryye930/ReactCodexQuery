import { Configuration, OpenAIApi } from "openai";

const organization = process.env.REACT_APP_ORGANIZATION;
const apiKey = process.env.REACT_APP_API_KEY;
const configuration = new Configuration({
  organization: organization,
  apiKey: apiKey,
});

export const formatQuery = (props) => {
  let formattedQuery;
  let error = null;
  if (props.currLang === "Python") {
    formattedQuery = props.query + " in Python";
  } else if (props.currLang === "Java") {
    formattedQuery = props.query + " in Java";
  } else if (props.currLang === "C") {
    formattedQuery = props.query + " in C";
  } else if (props.currLang === "chatGPT") {
    formattedQuery = props.query;
  } else if (props.query === "") {
    error = {
      code: "EmptyQuery",
      message: "Please enter a query to continue!",
    };
  } else {
    error = {
      code: "NoLangSelected",
      message: "Please select a language to continue!",
    };
  }
  return { formattedQuery, error };
};

export const addToHistory = (props, newAnswer) => {
  const { formattedQuery, error } = formatQuery(props);

  if (error) {
    props.setError(error);
    return;
  }

  let newEntry = {
    question: formattedQuery,
    model: props.currLang === "chatGPT" ? "gpt-4" : "text-davinci-003",
    answer: newAnswer,
  };
  let histories = props.histories;
  if (newEntry.question.toString() !== "") {
    if (histories.length === 0) {
      histories.push(newEntry);
    } else if (
      JSON.stringify(histories[histories.length - 1]) !==
      JSON.stringify(newEntry)
    ) {
      histories.push(newEntry);
    }
  }
};

export const timeout = (duration) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Request timed out"));
    }, duration);
  });
};

export const queryGPT = async (props) => {
  const { formattedQuery, error } = formatQuery(props);

  if (error) {
    props.setError(error);
    return;
  }

  const openai = new OpenAIApi(configuration);
  const apiCall = async () => {
    let response;
    if (props.currLang === "chatGPT") {
      const apiParams = {
        model: "gpt-4",
        messages: [{ role: "user", content: formattedQuery }],
        max_tokens: 400,
        temperature: 0.7,
        top_p: 1,
        n: 1,
      };
      response = await openai.createChatCompletion(apiParams);
    } else {
      const apiParams = {
        model: "text-davinci-003",
        prompt: formattedQuery,
        max_tokens: 200,
        temperature: 0.7,
        top_p: 1,
        n: 1,
        stream: false,
        logprobs: null,
      };
      response = await openai.createCompletion(apiParams);
    }
    return response;
  };

  try {
    return await Promise.race([apiCall(), timeout(60000)]);
  } catch (error) {
    props.setError(error);
  }
};

export const processQuery = (props) => {
  props.setLoading(true);
  queryGPT(props)
    .then((response) => {
      let newAnswer;
      if (props.currLang === "chatGPT") {
        newAnswer = response.data.choices[0].message.content;
      } else {
        newAnswer = response.data.choices[0].text;
      }
      props.setData(newAnswer);
      addToHistory(props, newAnswer); // Pass the new answer to the addToHistory function
    })
    .finally(() => props.setLoading(false));
};

export const formSubmit = (e, props) => {
  e.preventDefault();
  processQuery(props);
};
