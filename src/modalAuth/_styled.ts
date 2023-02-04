import {styled, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";

const LIST_COMPONENTS = {
    padding: styled(TextField)`
        margin: 10px;
    `,
    button:styled(Button)`
      margin: 10px;
    `,
    h5:styled(Typography)`
      margin: 10px;
    `,
    accept:styled(Typography)`
      margin: 10px;
      cursor: pointer;
    `
}

export {LIST_COMPONENTS}
