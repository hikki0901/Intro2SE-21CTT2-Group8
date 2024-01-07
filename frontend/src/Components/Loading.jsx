import ClipLoader from "react-spinners/ClipLoader";
import "../CSS/loading.css"

function Loading(props){
    return(
    <div class ="loading col-12">
      <div >
        <ClipLoader
          color= "#36d7b7"
          loading={props.loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"/>
        <p class="textl">Loading....</p>
      </div>
    </div>
    )
}

export default Loading
