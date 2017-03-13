import React from 'react';

export default class Calendar extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            monthSet:[
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ],
            weekSet:[
                'Su',
                'Mo',
                'Tu',
                'We',
                'Th',
                'Fr',
                'Sa'
            ],
            currentDate : new Date()
        }

        this.onNext = this.onNext.bind(this);
        this.onPrev = this.onPrev.bind(this);
    }
    
    getMonthName(currentDate){
        return this.state.monthSet[currentDate.getMonth()];
    }
    getTheYear(currentDate){
        let year = currentDate.getFullYear();
        return year;
    }
    getFirstDayOfMonth(currentDate){
        let firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
        console.log(firstDay, 'firstDay');
        return firstDay;
    }
    getDateSet(currentDate){
        let date = new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 0);
        let dateSet = [];
        for(let i = 1; i <= date.getDate(); i ++){
            dateSet.push(i);
        }
        return dateSet;
    }
    onNext(){
        let currentDate = this.state.currentDate;
        let year = this.getTheYear(currentDate);
        let month = currentDate.getMonth();
        let newDate = new Date(year, month+1, currentDate.getDate());
        this.setState({
            currentDate : newDate
        });
    }
    onPrev(){
        let currentDate = this.state.currentDate;
        let year = this.getTheYear(currentDate);
        let month = currentDate.getMonth();
        let newDate = new Date(year, month-1, currentDate.getDate());
        this.setState({
            currentDate : newDate
        });

    }
    renderCell(date, selectedDay){
        return(
            <div key={Math.random()} className={`cell-block ${(selectedDay)?'selected':''}`}>
                <div className="cell">{date}</div>
            </div>
        );
    }
    renderTable(currentDate){
        const matrix = [];
        const dateSet = this.getDateSet(currentDate);
        let firstDay = this.getFirstDayOfMonth(currentDate);
        let i = -firstDay;
        for(let x = 0; x < 6; x ++){
            matrix[x] = [];
            for(let y = 0; y < 7; y ++){
                matrix[x][y] = dateSet[i++];
            }
        }
        let selectedDay = currentDate.getDate();
        console.log(selectedDay, 'selectedDay');
        return matrix.map((row)=>{
            return row.map((date)=>(date != selectedDay)?this.renderCell(date, false):this.renderCell(date, true));
        });
    }
    renderWeek(){
       return this.state.weekSet.map((week)=>this.renderCell(week))
    }
    render(){

        return(
            <div>
                <div className="month-year-block">  
                    <div onClick={this.onPrev}>  
                        <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24">
                            <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
                            <path d="M0-.5h24v24H0z" fill="none"/>
                        </svg>
                    </div>                  
                        <div className="month">{this.getMonthName(this.state.currentDate)}</div>
                        <div className="year">{this.getTheYear(this.state.currentDate)}</div>
                    <div onClick={this.onNext}>
                        <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24">
                            <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
                            <path d="M0-.25h24v24H0z" fill="none"/>
                        </svg>
                    </div>
                </div>
                <div className="week-block">{this.renderWeek()}</div>
                {this.renderTable(this.state.currentDate)}
            </div>
        );
    }
}