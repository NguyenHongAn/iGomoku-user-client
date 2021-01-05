import React from 'react';

export default class Board extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        //white goes first
        'isWhite':true,
        //this sets up an empty board
        //"+"" represenets an empty square, "b" is a black stone and "w" is a white stone
        'grid':Array(19).fill().map(x => Array(19).fill("+")),
      };
    }
  
    //generate a new empty grid and set it to the grid state with setState
    handleReset(){
      let newGrid = Array(19).fill().map(x => Array(19).fill("+"));
      this.setState({'grid':newGrid});
    }
  
    
    render(){
      //define styles for the <table> element in the return() function below
      const style={
               textAlign: "center",
               margin:"auto",
               height: "auto",
               width:"500px",
               border:"1px solid black",
               tableLayout:'fixed',
             };
      const g = this.state.grid;
      //loop through the squares in each row and generate a new Square component,
      //passing in props to the Square component in the nested map() function
      const board = g.map((row, i) => { return (
        <tr key={"row_"+i}>
          {row.map((col, j) => {
            //set the color of the square based on state.grid
            const color_ = g[i][j] === '+' ? '#e4e4a1': g[i][j] === 'w' ? 'white':'black';
            //return Square component, passing in the following as props:
            //square color defined above in color_,
            //a value for the key which React needs (I think) and
            //a function to handle clicks with grid coordinates passed in as arguments
            return (
              <Square  color={color_} key={i+"_"+j} />
                )
              }
            )
          }
        </tr>)
      });
  
      //returns the board with the Square Components in {board},
      //as well as a simple Button component that takes the handleReset function as a prop
      //this could be further refactored to separate the layout and styling, but it isn't that complicated so I will leave it like this
      return (
        <div style={{ textAlign:'center'}}>
        <div style={{margin: 'auto', width:"40%"}}>
        <table cellSpacing="0" style={style}>
          <tbody>
            {board}
          </tbody>
        </table>
        </div>
        </div>
      )
    }
  }

class Square extends React.Component{
  render(){
    const color_ = this.props.color;
    return (
      <td
        style={{
          overflow:'hidden',
          width:'30px',
          height:'30px',
          backgroundColor:'#e4e4a1',
          color:'red',
          boarderColor: 'black',
          border:".5px solid black"
        }}
      onClick={this.props.handleClick} >
        <div
          style={{color:color_,
                  border:"1px solid",
                  backgroundColor: color_,
                  borderColor: color_,
                  height:30,
                  width:30}} >
        </div>
      </td>
    )
  }
}