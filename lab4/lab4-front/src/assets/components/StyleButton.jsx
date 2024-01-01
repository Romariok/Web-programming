import Button from '@mui/material/Button';


export default function StyleButton(props) {
   return (<>
      <Button
         type={props.type}
         fullWidth
         variant="contained"
         sx={{
            mt: 3, mb:2, fontFamily: "Undertale",
            backgroundColor: 'black', color: 'orange',
            colorHover: 'black', ":hover": {
               backgroundColor: 'black',
               color: 'orange'
            },
            ":active": {
               backgroundColor: 'black',
               color: 'orange'
            },
            ":active:after": {
               backgroundColor: 'black',
               color: 'orange'
            }
         }}
         onClick={props.action}
         disabled={props.disabled}
      >
         {props.text}
      </Button>
   </>)
}