import RingLoader from "react-spinners/RingLoader";
import "../CSS/loading.css"

function Loading(props){
    return(
    <div class ="loading col-12">
      <div >
        <RingLoader
          color= "#36d7b7"
          loading={props.loading}
          size={160}
          aria-label="Loading Spinner"
          data-testid="loader"/>
      </div>
    </div>
    )
}

export default Loading
