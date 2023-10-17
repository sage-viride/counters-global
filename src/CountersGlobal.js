import "./styles.css";
import { useState } from "react";

/*
 * It's *critical* that this traditional global variable be declared
 *  *outside* all components!
 */ 
let nextUid = 1; 

export default function CountersGlobal() {
  const [counts, setCounts] = useState({});

  function setCountForUid (uidString, newCount) {
    let countsCopy = {... counts};
    countsCopy[uidString] = newCount; 
    setCounts(countsCopy)
  }

  function newCounter() {
    setCountForUid( nextUid.toString(), 0);
    console.log(`nextUid before increment: ${nextUid}`);
    nextUid++;
    console.log(`nextUid after increment: ${nextUid}`);		
  }

  function deleteCounter(uidString) {
    console.log(`deleteCounter(${uidString})`); 
    /* Implement me! */
  }

  return (
    <div className="outer">
      <div className="state">
         {JSON.stringify({counts: counts} , null, 2)}
      </div>
      <button
        onClick={newCounter}
      >
        New Counter
    </button>
      <div className="counters">
    { Object.keys(counts).map( uidString =>
	  <Counter
            uidString={uidString}
            key={uidString}
            getCount={ () => counts[uidString] }
            setCount={ newCount => setCountForUid(uidString, newCount) }
            deleteMe={ () => deleteCounter(uidString) }
	    />
       ) 
     }
      </div>
    </div>
  );
}

function Counter( {uidString, getCount, setCount, deleteMe} ) {
  const [expanded, setExpanded] = useState(true);  

  function plus1() {
    let newCount = getCount() + 1;
    setCount(newCount);
  }

  function reset() {
    setCount(0);
  }

  function toggleExpand() {
    console.log('toggleExpand');
    /* Implememt me! */
  }

  return (
      <div className="counter" onClick={toggleExpand}>
      <h1>Counter #{uidString}</h1>
      { expanded &&
        <div> 
          <span className="count">{getCount()}</span>
          <button onClick={plus1}>+1</button>
          <button onClick={reset}>->0</button>
          <button onClick={deleteMe}>X</button>
        </div>
      }
    </div>
  );
}
