 import './Survey.css'

 function Survey(props){
    const {name,lastDate,answers}=props;
    console.log(lastDate,answers)
    return (<>
    <h1>Survey component</h1>
    <p>subject: {name}</p>
    {(lastDate> new Date())?
           <span>active until {lastDate.toDateString()}</span> :
          <span>the survey is inactive</span>}
          <br/>
    {answers >= 3000 && <span>Popular Survey!</span>}
    </>
)
}
Survey.defaultProps={name:"anonymous",lastDate:new Date(),answers:0}
export default Survey;