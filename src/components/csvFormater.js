import React, { Component } from 'react';
import { CSVReader, jsonToCSV } from 'react-papaparse';

const CsvFormater = () => {

  const csv_array = [];
  csv_array.push(['SR. NO', 'ID NUMBER', 'EMP NAME', 'IN TIME', 'OUT TIME', 'TOTAL DURATION', 'PUNCH RECORDS', 'WORK DURATION', 'PRESENT/ABSENT', 'STATUS', 'REMARK', 'TOTAL DURATION 1']);
  let regExp = /\(([^)]+)\)/;
  const handlerCsvRow = (data) => {
    let row = [];

    let punchRecordLits = data[data.length - 1].split(',');

    for (let i = 0; i < punchRecordLits.length - 1; i++)
    {
      let punchRecord = punchRecordLits[i].split(':');
      punchRecord[2] = punchRecord[2].replace(/\(TD\)/, "(Downstair)");
      console.log(punchRecord[2]);
    }


  };
  const handleOnDrop = (data) => {

    console.log(data);
    for (let i = 0; i < data.length; i++)
    {
      if (i > 0)
        handlerCsvRow(data[i].data);
    }

    // const csv = jsonToCSV(data, { download: true });

  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data) => {
    console.log(data);
  };
  return (
    <div>
      <h5>CSV Formatter</h5>
      <CSVReader
        onDrop={handleOnDrop}
        onError={handleOnError}
        addRemoveButton
        onRemoveFile={handleOnRemoveFile}
        config={{ encoding: "utf-8" }}
      // accept="text/csv, .csv,"
      >
        <span>Drop CSV file here or click to upload.</span>
      </CSVReader>

    </div>
  )
}


export default CsvFormater;