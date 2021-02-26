import React, { Component } from 'react';
import { CSVReader, jsonToCSV } from 'react-papaparse';

const CsvFormater = () => {

  const csv_array = [];
  csv_array.push(['SR. NO', 'ID NUMBER', 'EMP NAME', 'IN TIME', 'OUT TIME', 'TOTAL DURATION', 'PUNCH RECORDS', 'WORK DURATION', 'PRESENT/ABSENT', 'STATUS', 'REMARK', 'TOTAL DURATION 1']);
  let regExp = /\(([^)]+)\)/;
  let row = [];
  const handlerCsvRow = (data) => {


    let punchRecordList = data[data.length - 1].split(',');
    let valid = true;

    // let punchObject = dataParser(punchRecordList);
    // console.log(punchObject);
    const cols = [0, 1, 2, 9, 10, 13, 18, 11, 16,]
    for (let i = 0; i < data.length - 1; i++)
    {
      if (cols.indexOf(i))
        row.push(data[i]);
    }
    // for (let i = 0; i < punchRecordLits.length - 1; i++)
    // {
    //   let punchRecord1 = punchRecordLits[i].split(':');
    //   let punchRecord2 = punchRecordLits[i + 1].split(':');
    //   let stair1 = /\(([^)]+)\)/.exec(punchRecord1[2])[1];
    //   let stair2 = /\(([^)]+)\)/.exec(punchRecord1[2])[1];
    //   let punch1 = punchRecord1[2].substr(0, 1);
    //   let punch2 = punchRecord2[2].substr(0, 1);
    //   if (punch1 === 'i' && punch2 === 'o')
    //   {
    //     valid = true;
    //   }
    //   //   let punch = args.substr(0,1);

    //   // ValidPunch(punchRecord[2]);


    //   // punchRecord[2] = punchRecord[2].replace(/\(TD\)/, "(Downstair)");


    // }


  };


  const dataParser = (data) => {
    let punchRecordPrev = [];
    let punchRecordCur = [];
    let punchRecordNext = [];
    let punchObject = [];

    for (let i = 0; i < data.length; i++)
    {

      if (i === 0)
      {
        punchRecordCur = data[i].split(':')[2];
        punchRecordNext = data[i + 1].split(':')[2];
        if (!punchRecordCur.includes('in'))
        {
          punchRecordCur = 'in' + punchRecordCur;
        }
      }
      else if (i !== data.length - 1)
      {
        punchRecordPrev = data[i].split(':')[2];
        punchRecordCur = data[i].split(':')[2];
        punchRecordNext = data[i + 1].split(':')[2];

        if (!(punchRecordCur.includes('in') && punchRecordCur.includes('out')))
        {
          if (punchRecordPrev.includes('in'))
          {
            punchRecordCur = 'in' + punchRecordCur;
          }
          else if (punchRecordPrev.includes('out'))
          {
            punchRecordCur = 'out' + punchRecordCur;
          }
        }
      }
      else
      {
        if (!punchRecordCur.includes('out'))
        {
          punchRecordCur = 'out' + punchRecordCur;
        }

      }

      punchObject.push(punchRecordCur);
    }
    return punchRecordCur;
  };


  // const ValidPunch = (args) => {
  //   let valid = true;
  //   let stair = /\(([^)]+)\)/.exec(args)[1];
  //   let punch = args.substr(0,1);

  //   if(punch === 'i' && )

  // };
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
