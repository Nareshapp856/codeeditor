import axios from "axios";
import { filterProgramData } from "./filterApiResponse";

const baseURL = process.env.REACT_APP_ADMIN_API_URL;
const compilerURL = process.env.REACT_APP_COMPILER_API;
const compilerC = process.env.REACT_APP_C_COMPILER_API;
const reportURL = process.env.REACT_APP_REPORT_API_URL;

const api = axios.create({ baseURL });
export const compilerApi = axios.create({ baseURL: compilerURL });
const apiCS = axios.create({ baseURL: compilerC });
export const _reportAPI = axios.create({ baseURL: reportURL });

export const submitUserCodeApi = async (payload) => {
  try {
    const response = await axios.post("https://nareshitmulticompiler.azurewebsites.net/run-program", payload);
    return response;
  } catch (error) {
    throw error;
  }
};

export const executeCodeApi = async (payload) => {
  try {
    const response = await compilerApi.post("", payload);
    return response;
  } catch (error) {
    throw error;
  }
};

export const executeCCodeApi = async (payload) => {
  try {
    const response = await apiCS.post("/", payload);
    return response;
  } catch (error) {
    throw error;
  }
};

export const submitUserCCodeApi1 = async (payload) => {
  try {
    // const response1 = await apiCS.post("/", payload);
    const response1 = await axios.post("https://nareshitmulticompiler.azurewebsites.net/run-program", payload);
    return response1;
  } catch (error) {
    throw error;
  }
};

export const submitTestApi = async (payload) => {
  try {
    const response = await api.post("StudentProgramTestCases", payload);
    return response;
  } catch (error) {
    throw error; // Throw the error to be caught by Redux Saga
  }
};

export const p_submitCode = async (payload) => {
  try {
    const response = await api.post("/api/program/new-program", payload);
    return response;
  } catch (error) {
    throw error; // Throw the error to be caught by Redux Saga
  }
};

export const retrieveDetailsApi = async (payload) => {
  try {
    const response = await api.get(`retrieveProgramQuestions/${payload}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const retrieveTestCasesApi = async (payload) => {
  try {
    const response = await api.get(`retrieveProgramTestCase/${payload}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const retriveExamData = async (payload) => {
  try {
    const response = await axios.post(`https://nareshitcodeideweb.azurewebsites.net/apinit/RetriveTestsBystudentId_code`, {
      studentemail: payload.userMail,

      TestId: payload.testId,
    });

    const filteredData = filterProgramData(response);

    return filteredData;
  } catch (error) {
    throw error;
  }
};

export default api;

export const reportApi = async (payload) => {
  try {
    const response = await _reportAPI.post(`/report/codeide`, payload);

    return response;
  } catch (error) {
    throw error;
  }
};

export const dev_reportApi = async (payload) => {
  try {
    const response = await _reportAPI.post(`/report/codeide`, payload);

    return response;
  } catch (error) {
    throw error;
  }
};
