import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Alertclient = withReactContent(Swal);

//Titulos y mensajaes definidos Succes | error | confirm
//alert error
//alert confirm
//alert succes

//succes info warning
export const customAlert = (title, text, icon) => {
return Alertclient.fire({
    title,
    text,
    icon,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Aceptar"
});
};