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
using Npgsql;
using System.Runtime.Serialization.Json;
using System.Text;
using NpgsqlTypes;

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
        //SqlConnection conexion = new SqlConnection("Server=192.168.0.15;Database=EPATEC;Uid=jairo-mm;Pwd=So-far-away26;");
        NpgsqlConnection conexion = new NpgsqlConnection("Server=localhost;Port=5433;Database=construtec2;User Id=postgres;password=jason;");
        DataSet a = new DataSet();
        DataTable tabla = new DataTable("Tablageneral");// estructura que almacenará los datos 


        //SqlCommand comandoaux = new SqlCommand();// sirve para cuando son consultas a procediimientos almacenados 


      //  [WebMethod]
        /**
         * @Brief este método se encarga de mandar query a la base de datos
         * @param query es la consulta que se ejecutará el postgres
         * @return retorna la información proporcionada por la base de datos
        */
        public string GetData(NpgsqlCommand comandolocal)
        {
            //NpgsqlCommand comandolocal = new NpgsqlCommand(Queryable, conexion);
            String contenedor="";
            try
            {
                conexion.Open();// abre la conexion a la base de datos
                tabla.Load(comandolocal.ExecuteReader());// llena la tabla 
                contenedor = ConvertDataTableTojSonString (tabla);// conviete la informacion en Json
                conexion.Close();// cierra la conexión.
            }
            catch
            {
                contenedor = "no se pudo establecer la conexión de la base de datos";
            }
            return contenedor;
        }
        ///////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////
        /**
         * @Brief este método se encargará de listar cliente especifico 
         * @param no recive parametros
         * @return retorna la información proveniente del servidor en formato Json
        */
        [WebMethod]
        public string ListarEtapasPorProyecto(String datos)//
        {
            String query = "", aux = "";

            char[] delimitadores = { '/', '&', ',', '#' };// los separadores de los tokens 
            string[] atributos = datos.Split(delimitadores);// realilixa la separación
            //query = "select* from general_user where username= " +"'"+ atributos[0] +"'"+ " and pastword= " + "'"+atributos[1]+"'";
            aux =  atributos[0];
            query = "select* from select_stage_by_construction( " + aux + ")";
            NpgsqlCommand comandolocal = new NpgsqlCommand(query, conexion);
            return GetData(comandolocal);
        }

        ///////////////////////////////////////////////////////////////////////////////
        /**
         * @Brief este método se encargará de listar cliente especifico 
         * @param no recive parametros
         * @return retorna la información proveniente del servidor en formato Json
        */
        [WebMethod]
        public string ListarClienteEspecifico(String datos)//
        {
            String query = "",aux="";
            
            char[] delimitadores = { '/', '&', ',', '#' };// los separadores de los tokens 
            string[] atributos = datos.Split(delimitadores);// realilixa la separación
            //query = "select* from general_user where username= " +"'"+ atributos[0] +"'"+ " and pastword= " + "'"+atributos[1]+"'";
            aux = "'" + atributos[0] + "' ," + "'" + atributos[1] + "'";
            query = "select* from select_user( " + aux +")";
            NpgsqlCommand comandolocal = new NpgsqlCommand(query, conexion);
            return GetData(comandolocal);
        }
        ///////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////
        /**
         * @Brief este método se encargará de listar clientes de la ferreteria 
         * @param no recive parametros
         * @return retorna la información proveniente del servidor en formato Json
        */
        [WebMethod]
        public string ListarClientes()//
        {
            String query = "";// genera el query de pedir todos los usuarios
            query = "select* from general_user";// genera el query de pedir todos los usuarios
            NpgsqlCommand comandolocal = new NpgsqlCommand(query, conexion);
            return GetData(comandolocal);
        }
        ///////////////////////////////////////////////////////////////////////////////

        /**
         * @Brief este método se encargará de listar proyectos  
         * @param datos recive el id del proyecto
         * @return retorna la información proveniente del servidor en formato Json
        */
        [WebMethod]
        public string ListarRolesUsuario(String datos)//
        {
            String query = "";

            char[] delimitadores = { '/', '&', ',', '#' };// los separadores de los tokens 
            string[] atributos = datos.Split(delimitadores);// realilixa la separación
            query = "select* from select_rol_by_user( " +atributos[0] + ")";// manda el pid
            NpgsqlCommand comandolocal = new NpgsqlCommand(query, conexion);
            return GetData(comandolocal);
        }
        ///////////////////////////////////////////////////////////////////////////////

        /**
        * @Brief este método se encargará de listar proyectos  
        * @param datos recive el id del proyecto
        * @return retorna la información proveniente del servidor en formato Json
        */
        [WebMethod]
        public string ListarProyectos(String datos)//
        {
            String query = "";// genera el query de pedir todos los usuarios
            query = "select* from construction where user_id ="+datos;// genera el query de pedir todos los usuarios
            NpgsqlCommand comandolocal = new NpgsqlCommand(query, conexion);
            return GetData(comandolocal);
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
        
  
            String query = "", aux = "";
            char[] delimitadores = { '/', '&', ',', '#' };// los separadores de los tokens 
            string[] atributos = datos.Split(delimitadores);// realilixa la separación
            aux = atributos[0] + ", " + "'" + atributos[1] + "', " + "'"+atributos[2]+"',"+"'"+atributos[3]+"',"
                +"'"+atributos[4]+"',"+"'"+atributos[5]+"',"+"'"+atributos[6]+"',"+atributos[7]+", "+atributos[8];
            query = "select* from create_user( " + aux + ")";// manda el pid
            NpgsqlCommand comandolocal = new NpgsqlCommand(query, conexion);
            return GetData(comandolocal);

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
            return ConectarServidorViejo("listar/productos");
        }

        ///////////////////////////////////////////////////////////////////////////////
        /**
         * @Brief este método se encargará de registrar las etapas que se desean 
         * @param datos corresponde a los datos de la etapa a registrar
         * @return retorna la información proveniente del servidor en formato Json
        */
        [WebMethod]
        public string RegistrarEtapa(String datos)  
        {
            String query = "", aux = "";
            char[] delimitadores = { '/', '&', ',', '#' };// los separadores de los tokens 
            string[] atributos = datos.Split(delimitadores);// realilixa la separación
            aux = atributos[0] + ", " + "'" + atributos[1] + "'";
            query = "select* from create_stage( " + aux + ")";  // manda el pid
            NpgsqlCommand comandolocal = new NpgsqlCommand(query, conexion);
            return GetData(comandolocal);
        }
        ///////////////////////////////////////////////////////////////////////////////

        ///////////////////////////////////////////////////////////////////////////////
        /**
 * @Brief este método se encargará de  asignar las etapas de los proyectos 
 * @param datos corresponde a los datos de la etapa a asignar 
 * @return retorna la información proveniente del servidor en formato Json
*/
        [WebMethod]
        public string AsignacionEtapa(String datos) 
        {
            String query = "", aux = "";
            char[] delimitadores = { '/', '&', ',', '#' };// los separadores de los tokens 
            string[] atributos = datos.Split(delimitadores);// realilixa la separación
            aux = atributos[0] + ", " +   atributos[1] +", '"+atributos[2]+"' ," + "'" + atributos[3] + "'";
            query = "select* from insert_stage_into_construction( " + aux + ")";  // manda el pid
            NpgsqlCommand comandolocal = new NpgsqlCommand(query, conexion);
            return GetData(comandolocal);
        }
        ///////////////////////////////////////////////////////////////////////////////
        /**
         * @Brief este método se encargará de  asignar los materiales  de las etapas 
         * @param datos corresponde a los datos de los materiales de la etapa 
         * @return retorna la información proveniente del servidor en formato Json
        */
        [WebMethod]
        public string AsignacionMateriales(String datos)
        // datos=idProyecto/idEtapa/idmaterial1/cantidad/idmaterial2/cantidad
        {
            String query = "",aux="";
            NpgsqlCommand comandolocal=new NpgsqlCommand();
            char[] delimitadores = { '/', '&', ',', '#' };// los separadores de los tokens 
            string[] atributos = datos.Split(delimitadores);// realilixa la separación
            int cantidadMateriales = (atributos.Length-2)/2;
            


            for (int i = 2; i < cantidadMateriales; i++)// este for es para es pa introducir primero los materiales
            {
                aux = atributos[i];
                query = "select* from  insert_material( " + aux + ")";// manda el pid
                comandolocal = new NpgsqlCommand(query, conexion);
                aux = GetData(comandolocal);
            }

            for (int i = 2; i < cantidadMateriales; i++)
            {
                aux = atributos[1]+", " + atributos[i]+", " + atributos[i + 1]+ ", " + atributos[0];
                query = "select* from insert_material_into_stage( " + aux + ")";// manda el pid
                comandolocal = new NpgsqlCommand(query, conexion);
                aux= GetData(comandolocal);
            }


            return "se realizo con exito la insercion de materiales";
        }
        ///////////////////////////////////////////////////////////////////////////////
        /**
         * @Brief este método se encargará de  solicitar un presupuesto parcial 
         * @param datos corresponde al nombre de la etapa a la cual se quiere solicitar el presupuesto
         * @return retorna la información proveniente del servidor en formato Json
        */
        [WebMethod]
        public string PresupuestoEtapa(String datos)
        {
            String query = "";
            NpgsqlCommand comandolocal = new NpgsqlCommand(query, conexion);
            return "deberia de obtener el presupuesto de la etapa";
        }
        ///////////////////////////////////////////////////////////////////////////////

        ///////////////////////////////////////////////////////////////////////////////
        /**
         * @Brief este método se encargará de  solicitar un presupuesto total 
         * @param datos corresponde al nombre del proyecto al cual se quiere solicitar el presupuesto
         * @return retorna la información proveniente del servidor en formato Json
        */
        [WebMethod]
        public string PresupuestoTotal(String datos)
        {

            String query = "";
            NpgsqlCommand comandolocal = new NpgsqlCommand(query, conexion);
            return "deberia de obtener el presupuesto de todas las etapas";
        }
        ///////////////////////////////////////////////////////////////////////////////
        /**
         * @Brief este método se encargará realizar los pedidos de las etapas 
         * @param datos corresponde al nombre de la etapa y proyecto
         * @return retorna la información proveniente del servidor en formato Json
        */
        [WebMethod]
        public string RealizarPedido(String datos)
        {
            String query = "";
            NpgsqlCommand comandolocal = new NpgsqlCommand(query, conexion);
            return "deberia de realizar los pedidos de las etapas";
        }
        ///////////////////////////////////////////////////////////////////////////////

                    /**
         * @Brief este método se encargará de buscar los proyectos que tengan una etapa en 15 dias 
         * @param no recibe parametros
         * @return retorna la información proveniente del servidor en formato Json
        */
        [WebMethod]
        public string Proyectosen15dias()
        {
            String query = "";
            NpgsqlCommand comandolocal = new NpgsqlCommand(query, conexion);
            return "deberia arrojar todos los proyectos que tenga una fase en 15 dias";
        }
        ///////////////////////////////////////////////////////////////////////////////

            /**
            * @Brief este método se encargará de buscar los proyectos que tengan un material x 
            * @param datos recibe el material con el cual se quiere filtrar
            * @return retorna la información proveniente del servidor en formato Json
            */
        [WebMethod]
        public string ProyectoConMaterialX(String datos)
        {
            String query = "";
            NpgsqlCommand comandolocal = new NpgsqlCommand(query, conexion);
            return "deberia arrojar todos los proyectos en los cuales hay el material X";
        }
        ///////////////////////////////////////////////////////////////////////////////

        /**
        * @Brief este método se encargará de buscar los proyectos que tengan un material x 
        * @param datos recibe el material con el cual se quiere filtrar
        * @return retorna la información proveniente del servidor en formato Json
        */
        [WebMethod]
        public string MarcarEtapa(String datos)
        {
            String query = "";
            NpgsqlCommand comandolocal = new NpgsqlCommand(query, conexion);
            return "deberia de marcar las etapas como finalizadas";
        }
        ///////////////////////////////////////////////////////////////////////////////

        /**
        * @Brief este método se encargará de crear comentarios 
        * @param datos recibe el material con el cual se quiere filtrar
        * @return retorna la información proveniente del servidor en formato Json
        */
        [WebMethod]
        public string AgregarComentario(String datos)
        {
            String query = "";
            NpgsqlCommand comandolocal = new NpgsqlCommand(query, conexion);
            return "deberia de agregar de comentar";
        }
        ///////////////////////////////////////////////////////////////////////////////
        /**
         * @Brief este método se encarga de realizar la conexión con el otro webservice
         * @param frase indica la consulta para el servidor anterior 
         * @return retorna la información proveniente del servidor en formato Json
        */
        public String ConectarServidorViejo(String frase)
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

