import { Button, Grid, List, ListItem, Modal, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function SubmitModal({
  setSubmitModal,
  submitModal,
  formData,
  testCases,
  files,
  submitCode,
}) {
  return (
    <Modal onClose={() => setSubmitModal(false)} open={submitModal}>
      <Grid
        container
        spacing={2}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
            Program Summary
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <List>
            <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="body2"
                color={!formData.problemName ? "error" : "textPrimary"}
              >
                Program Name:
              </Typography>
              <Typography variant="body2">{formData.problemName}</Typography>
            </ListItem>
            <ListItem
              sx={{ flexDirection: "column", alignItems: "flex-start" }}
            >
              <Typography
                variant="body2"
                color={!formData.problemDescription ? "error" : "textPrimary"}
                sx={{ mb: 1 }}
              >
                Program Description:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  width: "100%",
                  bgcolor: "background.default",
                  p: 2,
                  borderRadius: 1,
                  overflow: "auto",
                  maxHeight: 100,
                }}
                className="minimize-scroll-width"
              >
                {formData.problemDescription}
              </Typography>
            </ListItem>
            <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="body2"
                color={!formData.sampleInput ? "error" : "textPrimary"}
              >
                Sample Input:
              </Typography>
              <Typography variant="body2">{formData.sampleInput}</Typography>
            </ListItem>
            <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="body2"
                color={!formData.sampleOutput ? "error" : "textPrimary"}
              >
                Sample Output:
              </Typography>
              <Typography variant="body2">{formData.sampleOutput}</Typography>
            </ListItem>
            <ListItem
              sx={{ flexDirection: "column", alignItems: "flex-start" }}
            >
              <Typography
                variant="body2"
                color={!formData.explanation ? "error" : "textPrimary"}
                sx={{ mb: 1 }}
              >
                Explanation:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  width: "100%",
                  bgcolor: "background.default",
                  p: 2,
                  borderRadius: 1,
                  overflow: "auto",
                  maxHeight: 100,
                }}
                className="minimize-scroll-width"
              >
                {formData.explanation}
              </Typography>
            </ListItem>
            <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="body2"
                color={!Object.keys(testCases).length ? "error" : "textPrimary"}
              >
                Test Cases:
              </Typography>
              <Typography variant="body2">
                {Object.keys(testCases).length}
              </Typography>
            </ListItem>
            <ListItem sx={{ display: "flex", justifyContent: "center" }}>
              {formData.image ? (
                <img
                  src={formData.image}
                  alt="Program"
                  style={{ width: "200px", height: "auto", borderRadius: 4 }}
                />
              ) : (
                <>
                  <Typography variant="body2">Image:</Typography>
                  <Typography variant="body2" color="error">
                    Not provided
                  </Typography>
                </>
              )}
            </ListItem>
          </List>
        </Grid>

        <Grid item xs={6} sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => setSubmitModal(false)}
          >
            Keep editing
          </Button>
        </Grid>

        <Grid item xs={6} sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setSubmitModal(false);
              submitCode({
                files,
                testCases,
                ...formData,
                image: JSON.stringify(formData.image),
              });
            }}
          >
            Confirm submit
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
}

export default SubmitModal;
