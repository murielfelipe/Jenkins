import React from "react";

class SelectItems extends React.Component {
    constructor (props){
        super(props);
    }

    render(){
        return(
            <div>
                <button  data-testid={"btn-select-all"} type="button" onClick={this.props.handleOnClickSelectAll}>Select All</button>
            </div>
        );
    }
}
export default SelectItems;