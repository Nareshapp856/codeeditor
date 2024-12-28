function createResObj(x) {
  return { data: { dbresult: x, message: "fetch success" }, status: 200 };
}

export function problemApiSplitService(x, n) {
  let testcasesData = [];
  let detailsData = {};
  if (!x?.data?.dbresult) return [createResObj({}), createResObj([])];

  const data = x.data.dbresult;

  const desiredProgram = data.find((program) => program.ProgramId === n);

  if (!desiredProgram) return [createResObj({}), createResObj([])];

  detailsData = desiredProgram;
  testcasesData = desiredProgram.TestCases;

  return [createResObj([detailsData]), createResObj(testcasesData)];
}
