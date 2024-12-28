import { Paper, Grid, TextField, Typography, Box } from "@mui/material";
import { connect } from "react-redux";
import Image from "./Details/Image";
import { setFormItem } from "../../redux/slices/ProgramSubmmitionSlice";

function DetilsComponent({ formData, setFormItem }) {
  const onProblemName = (e) => {
    setFormItem({ key: "problemName", value: e.target.value });
  };
  const onProblemDescription = (e) => {
    setFormItem({ key: "problemDescription", value: e.target.value });
  };
  const onSampleInput = (e) => {
    setFormItem({ key: "sampleInput", value: e.target.value });
  };
  const onSampleOutput = (e) => {
    setFormItem({ key: "sampleOutput", value: e.target.value });
  };
  const onExplanation = (e) => {
    setFormItem({ key: "explanation", value: e.target.value });
  };
  const setImage = (newImage) => {
    setFormItem({ key: "image", value: newImage });
  };

  return (
    <Box className="p-4 pt-0 overflow-auto">
      <Typography variant="h3" className="mb-4 text-gray-900">
        Program Question
      </Typography>
      <hr className="border-gray-300 my-4" />
      <Box className="mt-4 mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          <input
            value={formData.problemName}
            onChange={onProblemName}
            placeholder="Problem name"
            className="bg-gray-100 p-2 px-4 w-full  text-lg font-normal"
          />
        </h2>
        <textarea
          value={formData.problemDescription}
          onChange={onProblemDescription}
          placeholder="Problem Description..."
          style={{ width: "100%" }}
          className="bg-gray-100 p-2 px-4 text-lg"
        />
      </Box>
      <hr className="border-gray-300 my-4" />
      <Image image={formData.image} setImage={setImage} />
      <hr className="border-gray-300 my-4" />
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} className="p-4">
            <Typography variant="h5" className="mb-2 text-gray-900">
              Sample Input
            </Typography>
            <textarea
              value={formData.sampleInput}
              onChange={onSampleInput}
              placeholder="Sample Input"
              style={{ width: "100%" }}
              className="bg-gray-100 p-2 px-4 text-lg"
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} className="p-4">
            <Typography variant="h5" className="mb-2 text-gray-900">
              Sample Output
            </Typography>
            <textarea
              value={formData.sampleOutput}
              onChange={onSampleOutput}
              placeholder="Sample Output"
              style={{ width: "100%" }}
              className="bg-gray-100 p-2 px-4 text-lg"
            />
          </Paper>
        </Grid>
      </Grid>
      <hr className="border-gray-300 my-4" />
      <Box className="mb-6">
        <Typography variant="h5" className="mb-4 text-gray-900">
          Explanation
        </Typography>
        <Paper elevation={3} className="p-4 bg-gray-100 rounded mt-4">
          <textarea
            value={formData.explanation}
            onChange={onExplanation}
            placeholder="Explanation..."
            style={{ width: "100%" }}
            className="bg-gray-100 p-2 px-4 text-lg"
            rows={4}
          />
        </Paper>
      </Box>
      <hr className="border-gray-300 my-4" />
      <Box>
        <Typography variant="h5" className="mb-4 text-gray-900">
          Note:
        </Typography>
        <Typography variant="body1" className="text-gray-700 mb-4">
          Your code must be able to print the sample output from the provided
          sample input. However, your code is run against multiple hidden test
          cases. Therefore, your code must pass these hidden test cases to solve
          the problem statement.
        </Typography>
        <Box className="mb-4">
          <Typography variant="h6" className="text-gray-900">
            Limits
          </Typography>
          <ul className="list-disc pl-5 text-gray-700">
            <li>
              <Typography variant="body2">
                Time Limit: 1.0 sec(s) for each input file
              </Typography>
            </li>
            <li>
              <Typography variant="body2">Memory Limit: 256 MB</Typography>
            </li>
            <li>
              <Typography variant="body2">Source Limit: 1024 KB</Typography>
            </li>
          </ul>
        </Box>
        <Box className="mb-4">
          <Typography variant="h6" className="text-gray-900">
            Scoring
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            Score is assigned if any testcase passes
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6" className="text-gray-900">
            Allowed Languages
          </Typography>
          <Typography variant="body2" className="text-gray-700">
            Bash, C, C++14, C++17, Clojure, C#, D
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

const mapState = (state) => ({
  formData: state.programSubmmition.formData,
});

const mapDispatch = {
  setFormItem,
};

const Details = connect(mapState, mapDispatch)(DetilsComponent);

export default Details;
