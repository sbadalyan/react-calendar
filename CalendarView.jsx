import React from 'react';
import Calendar from './Calendar.jsx';

export default class CalendarView extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="calendar">
                <Calendar/>
            </div>
        );
    }
}