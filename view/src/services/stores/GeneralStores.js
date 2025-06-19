import {  persistentMap } from "@nanostores/persistent";

export  const tableData =  persistentMap("tableData",{
    data: []

},{
  encode: JSON.stringify,
  decode: JSON.parse,
  listen: true,
});


 export const DataActions = {
  // Cargar datos iniciales
  loadData(newData) {
    tableData.set({
      data: newData,
      
    });
  },

  // Añadir nuevo registro
  addData(newRecord) {
    const current = tableData.get();
    tableData.set({
      data: [...current.data, { 
        ...newRecord, 
        // id: Date.now() // ID simple basado en timestamp
      }],
    //   lastUpdated: new Date().toISOString()
    });
  },

  // Actualizar registro existente
  updateRecord(id, updates) {
    const current = tableData.get();
    tableData.set({
      data: current.data.map(record => 
        record.id === id ? { ...record, ...updates } : record
      ),
    //   lastUpdated: new Date().toISOString()
    });
  },

  // Eliminar registro
  deleteRecord(id) {
    const current = tableData.get();
    tableData.set({
      data: current.data.filter(dat => dat.id !== id),
    });
  }
};


