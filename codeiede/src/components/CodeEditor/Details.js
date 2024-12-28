import { Grid } from "@mui/material";
import { connect } from "react-redux";
import { useEffect, useRef } from "react";

function DetailsComponent({ retrievedDetails }) {
  const {
    TestDescription: ProgramDescription,
    Explanation,
    TestName,
    SampleInput,
    SampleOutput,
    Image,
    Constraints,
  } = retrievedDetails;

  return (
    <article className="p-4 pt-0 overflow-auto">
      <h1 className="text-3xl font-bold mb-2 text-gray-900">
        Program Questions
      </h1>
      <hr className="border-gray-300 my-4" />
      <section className="mt-4 mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          {TestName && TestName}
        </h2>
        <pre className="roboto text-gray-700">
          {ProgramDescription && ProgramDescription}
        </pre>
      </section>
      <hr className="border-gray-300 my-4" />

      {Image && (
        <>
          <div className="mx-auto max-w-xs">
            <img
              src={Image}
              alt="Program"
              height="300"
              width="300"
              className="mx-auto"
            />
          </div>
          <hr className="border-gray-300 my-4" />
        </>
      )}

      <div className="space-y-2">
        <div className="p-2 border rounded-md shadow flex-grow flex flex-col">
          <h3 className="text-xl font-semibold text-gray-900">Sample Input</h3>
          <div className="p-3 pb-0 rounded flex-grow">
            <pre className="text-sm text-gray-700 w-full h-auto overflow-auto">
              {SampleInput}
            </pre>
          </div>
        </div>
        <div className="p-2 border rounded-md shadow flex-grow flex flex-col">
          <h3 className="text-xl font-semibold text-gray-900">Sample Output</h3>
          <div className="p-3 pb-0 rounded flex-grow">
            <pre className="text-sm text-gray-700 w-full overflow-auto">
              {SampleOutput}
            </pre>
          </div>
        </div>
      </div>

      <hr className="border-gray-300 my-4" />

      {Constraints && (
        <>
          <div className="max-w-xs">
            <h4 className="text-xl font-semibold mb-2">Constraints:</h4>
            <div className="bg-gray-100 p-4 rounded">
              <pre className="text-md font-mono">{Constraints}</pre>
            </div>
          </div>
          <hr className="border-gray-300 my-4" />
        </>
      )}

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Explanation</h2>
        <p className="mt-4">{Explanation && Explanation}</p>
      </section>
      <hr className="border-gray-300 my-4" />
      <article>
        <h2 className="text-2xl font-semibold text-gray-900">Note:</h2>
        <p className="text-base text-gray-700">
          Your code must be able to print the sample output from the provided
          sample input. However, your code is run against multiple hidden test
          cases. Therefore, your code must pass these hidden test cases to solve
          the problem statement.
        </p>
        <ul className="p-0">
          <h3 className="text-xl font-semibold text-gray-900">Limits</h3>
          <li>
            <p className="text-sm text-gray-700">
              <i>Memory Limit: 1 MB</i>
            </p>
          </li>
          <li>
            <p className="text-sm text-gray-700">
              <i>Time Limit: 60 ms</i>
            </p>
          </li>
        </ul>
        <article>
          <h3 className="text-xl font-semibold text-gray-900">Scoring</h3>
          <p className="text-sm text-gray-700">
            Score is assigned if any testcase passes
          </p>
        </article>
        <article>
          <h3 className="text-xl font-semibold text-gray-900">
            Allowed Languages
          </h3>
          <p className="text-sm text-gray-700">
            python, c, csharp, java, javascript
          </p>
        </article>
      </article>
    </article>
  );
}

const mapState = (state) => ({
  retrievedDetails: state.retrieveDetails.data,
});

const Details = connect(mapState, null)(DetailsComponent);

export default Details;
