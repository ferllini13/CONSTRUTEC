using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Data.SqlClient;
using System.Data;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
//using System.Runtime.Serialization.Json;
using System.IO;

namespace Proyecto2
{
    /// <summary>
    /// Summary description for Construtec
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class Construtec : System.Web.Services.WebService
    {

        [WebMethod]
        /**
         * @Brief 
         * @param paran1 y su funcion
         * @return qué retorna 
        */
        public string HelloWorld()
        {
            String contenedor="";
            contenedor = aux("listar/pedidos");
            return contenedor;
        }
        ////////////////////////////////////////////////////////////////////////////////
        /**
         * @Brief este método se encargará de registrar a los ingenieros y arquitectos
         * @param datos indica los datos que se desea introducir 
         * @return retorna la información proveniente del servidor en formato Json
        */
        [WebMethod]
        public string RegistrarIngeniero(String datos)
        {
            return datos;
        }
        ///////////////////////////////////////////////////////////////////////////////
        /**
         * @Brief este método se encargará de registrar a los clientes 
         * @param datos indica los datos que se desea introducir los datos de los clietes
         * @return retorna la información proveniente del servidor en formato Json
        */
        [WebMethod]
        public string RegistrarClientes(String datos)
        {
            return datos;
        }
        ///////////////////////////////////////////////////////////////////////////////
        /**
         * @Brief este método se encargará de consultar todos los materiales 
         * @param 
         * @return retorna la información proveniente del servidor en formato Json
        */
        [WebMethod]
        public string ConsutaMateriales() // no recive parametros 
        {
            return "deberia de dar todos los materiales ";
        }
        ///////////////////////////////////////////////////////////////////////////////
        /**
         * @Brief este método se encarga de realizar la conexión con el otro webservice
         * @param frase indica la consulta para el servidor anterior 
         * @return retorna la información proveniente del servidor en formato Json
        */
        public String aux(String frase)
        {
            String contenedor = "jason"; // va a contener la informacion
            ServicioViejo.EPATEC servicio = new ServicioViejo.EPATEC(); // realiza la conexión
            contenedor=servicio.Parsear(frase);// hace referencia al metodo que se quiere ejecutar en el servidor
            return contenedor;
        }
        [WebMethod]
        public string Prueba()
        {
            return "Esto es prueba";
        }


        /**
        * @Brief Este método es para convertir una tabla de datos en un formato Json, usando la serializacion de c#
        * @param DataTable Le entra la tabla proveniente de la base de datos 
        * @return Retorna un string con los datos en formato Json
        */

        public String ConvertDataTableTojSonString(DataTable dataTable) // este método es quien realiza la conversion a json 
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            List<Dictionary<String, Object>> tableRows = new List<Dictionary<String, Object>>();
            Dictionary<String, Object> row;
            foreach (DataRow dr in dataTable.Rows) // para cada linea osea cada fila en la tabla
            {
                row = new Dictionary<String, Object>();//cree un diccionario para cada fila 
                foreach (DataColumn col in dataTable.Columns)// para cada columna en la tabla 
                {
                    row.Add(col.ColumnName, dr[col]);// agrgue al diccionario el valor de cada columna 
                }
                tableRows.Add(row); // agregue la fila correspondiente
            }
            return serializer.Serialize(tableRows);// hace la conversión
        }
    }
}

