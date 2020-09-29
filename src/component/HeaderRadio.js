import React from 'react';

export function HeaderRadio({handleRadio,valueItem, nameId, language}) {

    let outRadioGroup = [];
    let index = 0;

    let _nameElement = nameId + "_radio";

    for(let key in valueItem){
        let _idElement = "" + nameId + index;
        

        outRadioGroup.push(
            <div key={index} className="form_radio_group-item">
                <input id = {_idElement} type="radio" name={_nameElement} value={key} checked={valueItem[key]} onChange={handleRadio}></input>
                <label htmlFor={_idElement} >{language[language.select][key]}</label>
            </div>
        );

        index++;   
    }

    index = 0;

    return (

        <div className="form_radio_group">
            {outRadioGroup}
            
            {/* <div className="form_radio_group-item">
                <input id = "radio-1" type="radio" name="radio" value="id" checked={valueItem.id} onChange={handleRadio}></input>
                <label htmlFor="radio-1" >id</label>
            </div>
            <div className="form_radio_group-item">
                <input id = "radio-2" type="radio" name="radio" value="name" checked={valueItem.name} onChange={handleRadio}></input>
                <label  htmlFor="radio-2">name</label>
            </div>
            <div className="form_radio_group-item">
                <input id = "radio-3" type="radio" name="radio" value="age" checked={valueItem.age} onChange={handleRadio}></input>
                <label htmlFor="radio-3">age</label>
            </div> */}

        </div>

    )
}