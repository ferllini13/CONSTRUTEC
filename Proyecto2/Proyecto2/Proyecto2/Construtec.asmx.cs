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
        public string HelloWorld()
        {
            String contenedor="";
            contenedor = aux("listar/pedidos");
            return contenedor;
        }
        public String aux(String frase)
        {
            String contenedor = "jason";
            ServicioViejo.EPATEC servicio = new ServicioViejo.EPATEC();
            contenedor=servicio.Parsear(frase);
            return contenedor;
        }
        [WebMethod]
        public string Prueba()
        {
            return "Esto es prueba";
        }

        // Este método es para convertir una tabla de datos en un formato Json, usando la serializacion de c#
        //Le entra la tabla proveniente de la base de datos 
        //Retorna un string con los datos en formato Json

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

