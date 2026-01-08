import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Upload() {
  const [texto, setTexto] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();

    // Obtener usuario logueado
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      setMensaje("Debes iniciar sesión para subir textos.");
      return;
    }

    // Subir texto a Supabase
    const { data, error } = await supabase
      .from("textos")
      .insert([{ usuario_id: user.id, contenido: texto }]);

    if (error) setMensaje(error.message);
    else setMensaje("Texto subido con éxito!");

    setTexto(""); // limpiar textarea
  };

  return (
    <div style={{ padding: 50 }}>
      <h2>Subir Texto</h2>
      <form onSubmit={handleUpload}>
        <textarea
          placeholder="Escribe aquí tu texto..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          rows={6}
          cols={50}
          required
        />
        <br />
        <button type="submit">Subir</button>
      </form>
      <p>{mensaje}</p>
    </div>
  );
}
