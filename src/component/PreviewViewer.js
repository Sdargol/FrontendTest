import React from 'react';

export function PreviewViewer(props) {

    let _calcYear = (year, propsLanguage) => {
        if ((year % 10) > 1 && (year % 10) < 5) {
            return propsLanguage.ot_year;
        }

        if ((year % 10) === 1) {
            return propsLanguage.year;
        }

        return propsLanguage.years;
    }


    let _year = _calcYear(props.age, props.language[props.language.select]);

    return (
        <div style={props._objClassCard} className="PreviewViewer_card_no_video">

            <div className="PreviewViewer_card_inner">

                <div className="PreviewViewer_avatar_container">
                    <div className="RowViewer_avatar_container">
                        <div className="RowViewer_avatar">
                            <img src={(() => "/images/" + props.image + ".svg")()} alt="Avatar" />
                        </div>

                        <div style={props._objClassAnimName} className="RowViewer_name">{props.name}</div>
                    </div>

                    <div onClick={(e) => props.handleClickFavourite(e, props.id)} className="RowViewer_favorites">
                        <svg className={props.favourite ? "active" : ""} xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32" aria-hidden="true" focusable="false">
                            <path d="M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798z"></path>
                        </svg>
                    </div>

                </div>

                <div style={props._objClassAnimText} className="RowViewer_number">{props.age} {_year}</div>
                <div style={props._objClassAnimText} className="RowViewer_number">{props.phone}</div>
                <div style={props._objClassAnimPhrase}>{props.phrase}</div>

            </div>
        </div>

    )
}