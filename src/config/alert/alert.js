import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const Alertclient = withReactContent(Swal);

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

export const confirmAlert = (preConfirm) => {
   return Alertclient.fire({
        title:"¿Estas seguro de realizar la acción?",
        text:"Le solicitamos esperar un momento a que la solicitud termine",
        icon:'info',
        confirmButtonText:"Aceptar",
        confirmButtonColor:"#0E7490",
        reverseButtons:true,
        backdrop:true,
        cancelButtonText:"Cancelar",
        showCancelButton:true,
        showLoaderOnConfirm:true,
        allowOutsideClick:()=> !Alertclient.isLoading(),
        preConfirm,
    });
}

