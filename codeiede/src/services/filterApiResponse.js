export function filterProgramData(x) {
  const fData = {};

  if (!x) {
    return { status: 500 };
  }

  if (!x.data?.dbresult) {
    return { status: 500 };
  }

  fData.status = x.status;
  fData.data = {};
  fData.data.dbresult = JSON.parse(Object.values(x.data.dbresult[0]));
  fData.statusMessage = x.statusText;

  return fData;
}
