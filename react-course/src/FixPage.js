// import React, { useState } from 'react';

// function FixPage() {
//   const [inputText, setInputText] = useState(''); // הטקסט שהמשתמש מכניס
//   const [correctedText, setCorrectedText] = useState(''); // הטקסט המתוקן

//   const handleInputChange = (e) => {
//     setInputText(e.target.value);
//   };

//   const handleCorrectText = () => {
//     // כאן תוכל להוסיף את הלוגיקה לתיקון המשפט, כרגע נשאיר זאת פשוט
//     setCorrectedText(inputText.replace('עילג', 'מתוקן')); // לדוגמה, נניח שהמשתמש יכניס "עילג" ואנחנו נשנה את זה ל"מתוקן"
//   };

//   return (
//     <div style={styles.container}>
//       <h1>תיקון משפטים</h1>
//       <textarea
//         value={inputText}
//         onChange={handleInputChange}
//         placeholder="הכנס את המשפט שלך כאן"
//         style={styles.textarea}
//       />
//       <button onClick={handleCorrectText} style={styles.button}>
//         תיקון <span style={styles.arrow}>→</span>
//       </button>
//       <div style={styles.outputContainer}>
//         {correctedText && (
//           <>
//             <h3>המשפט המתוקן:</h3>
//             <p>{correctedText}</p>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     textAlign: 'center',
//     padding: '30px',
//   },
//   textarea: {
//     width: '80%',
//     height: '100px',
//     padding: '10px',
//     fontSize: '16px',
//     marginBottom: '20px',
//     borderRadius: '5px',
//     border: '1px solid #ccc',
//   },
//   button: {
//     fontSize: '18px',
//     padding: '10px 20px',
//     cursor: 'pointer',
//     backgroundColor: '#4CAF50',
//     color: 'white',
//     border: 'none',
//     borderRadius: '5px',
//   },
//   arrow: {
//     fontSize: '22px',
//     marginLeft: '10px',
//   },
//   outputContainer: {
//     marginTop: '20px',
//     padding: '20px',
//     backgroundColor: '#f4f4f4',
//     borderRadius: '5px',
//   }
// };

// export default FixPage;
import React, { useState, useEffect } from 'react';

function FixPage() {
  const [inputText, setInputText] = useState('');
  const [correctedText, setCorrectedText] = useState('');
  const [text, setText] = useState(null);
  const [ok, setOk] = useState(false);

  // const handleClick = () => {
  //   setText(inputText); // עדכון המשתנה text לפי הקלט
  //   setOk(true);
  //   console.log("ok is now true");
  // };
const handleClick = () => {
  setCorrectedText(''); // איפוס התוצאה הקודמת מיד כשמשתמש לוחץ
  setText(inputText);
  setOk(true);
  console.log("ok is now true");
};

  useEffect(() => {
    if (ok && text) {
      setCorrectedText('');

      console.log("התחלת fetch לשרת עם הטקסט:", text);

      const url = 'https://localhost:44338/api/GetText';
      const urlWithParams = `${url}?text=${encodeURIComponent(text)}`;
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      };

      fetch(urlWithParams, requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log("נענה מהשרת:", data);
          setCorrectedText(data); // כאן אתה יכול להתאים אם צריך data.result או דומה
        })
        .catch(error => {
          console.error('שגיאה בבקשת fetch:', error);
        });

      setOk(false);
    }
  }, [ok, text]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };
const handleClearCorrectedText = () => {
  setCorrectedText('');
};

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>FIXME</h1>
        <textarea
          value={inputText}
          dir="rtl"
          onChange={handleInputChange}
          placeholder="הכנס את המשפט שלך כאן..."
          style={styles.textarea}
        />
        <button onClick={handleClick} style={styles.button}>
        
          תקן אותי <span style={styles.arrow}></span>
        </button>

        {correctedText && (
          <div style={styles.output}>
            <h3 style={styles.outputTitle}>המשפט המתוקן:</h3>
            <p style={styles.outputText}>{correctedText}</p>
                <button onClick={handleClearCorrectedText} style={styles.clearButton}>
                 מחק תוצאה
                </button>

          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: '100vh',
    background: 'linear-gradient(to right, #e0f7fa, #ffffff)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  card: {
    backgroundColor: '#ffffff',
    width: '100%',
    maxWidth: '400px',
    padding: '30px',
    borderRadius: '20px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  textarea: {
    width: '100%',
    height: '100px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    resize: 'none',
    marginBottom: '20px',
  },
  button: {
    fontSize: '18px',
    padding: '10px 20px',
    backgroundColor: '#6C43FF',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  arrow: {
    marginRight: '5px',
  },
  output: {
    marginTop: '30px',
    backgroundColor: '#f8f8f8',
    padding: '15px',
    borderRadius: '10px',
    textAlign: 'right',
  },
  outputTitle: {
    marginBottom: '10px',
    color: '#555',
  },
  outputText: {
    color: '#333',
    fontSize: '16px',
    direction: 'rtl',
  },
    clearButton: {
    marginTop: '10px',
    fontSize: '14px',
    padding: '6px 12px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },

};

export default FixPage;
