import { useState } from 'react';
import { nanoid } from 'nanoid'

function App() {
  const [tarea, setTarea] = useState('');
  const [listaTarea, setListaTarea] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEdicion, setIdEdicion] = useState('');
  const [error, setError] = useState(null);

  const agregarTarea = e => {
    e.preventDefault();

    if (!tarea.trim()) {
      setError('Escriba algo por favor...');
      return;
    }

    setListaTarea(prevState => (
      [...prevState, { id: nanoid(10), tarea }]
    ));
    setTarea('');
    setError(null);
  };

  const eliminarTarea = idTarea => {
    const arrayFiltrado = listaTarea.filter(item => item.id !== idTarea);
    setListaTarea(arrayFiltrado);
  };

  const activarEditarTarea = elemTarea => {
    setModoEdicion(true);
    setTarea(elemTarea.tarea);
    setIdEdicion(elemTarea.id);
  };

  const editarTarea = e => {
    e.preventDefault();

    if (!tarea.trim()) {
      setError('Escriba algo por favor...');
      return;
    }

    const arrayEditado = listaTarea.map(elemen => {
      if (elemen.id === idEdicion) {
        return {
          id: elemen.id,
          tarea
        };
      } else {
        return elemen;
      }
    });

    setListaTarea(arrayEditado);

    setModoEdicion(false);
    setTarea('');
    setIdEdicion('');
    setError(null);
  };

  const textoFormulario = modoEdicion ? 'Editar Tarea' : 'Agregar Tarea';
  const textoBtnFormulario = modoEdicion ? 'Editar' : 'Agregar';

  return (
    <div className="container mt-5">
      <h1 className="text-center">Mis tareas</h1>
      <hr />
      <div className="row">

        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>

          <ul className="list-group">
            {
              listaTarea.length > 0 ? (
                listaTarea.map(liTarea => (
                  <li className="list-group-item" key={liTarea.id}>
                    <span className="lead">{liTarea.tarea}</span>

                    <button
                      className="btn btn-danger btn-sm float-end mx-2"
                      onClick={() => eliminarTarea(liTarea.id)}
                    >
                      Eliminar
                    </button>

                    <button
                      className="btn btn-warning btn-sm float-end"
                      onClick={() => activarEditarTarea(liTarea)}
                    >
                      Editar
                    </button>
                  </li>
                ))
              ) : (
                <li className="list-group-item">No hay tareas agregadas</li>
              )
            }
          </ul>

        </div>

        <div className="col-4">
          <h4 className="text-center">{textoFormulario}</h4>

          <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>

            {error && <span className="text-danger">{error}</span>}

            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingresar tarea"
              value={tarea}
              onChange={e => setTarea(e.target.value)}
            />

            <button
              className="btn btn-dark w-100"
              type="submit"
            >
              {textoBtnFormulario}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default App;
