import Die from "./components/Die";
import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
    const [dice, setDice] = React.useState(allNewDice());
    const [tenzies, setTenzies] = React.useState(false);

    function allNewDice() {
        const newDice = [];
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie());
        }
        return newDice;
    }

    React.useEffect(() => {
        let hasWon = true;

        const superNumber = dice[0].value;

        for (let i = 1; i < dice.length; i++) {
            if (!(dice[i].isHeld && dice[i].value == superNumber)) {
                hasWon = false;
            }
        }

        if (hasWon) {
            setTenzies(true);
            console.log("You won!!");
        }
    }, [dice]);

    function holdDice(id) {
        setDice((prevDice) =>
            prevDice.map((die) =>
                id == die.id ? { ...die, isHeld: !die.isHeld } : die
            )
        );
    }

    const diceElements = dice.map((die) => (
        <Die
            key={die.id}
            id={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={holdDice}
        />
    ));

    function generateNewDice() {
        if(tenzies) {
            setDice(prevDice => prevDice.map(die => ({...die, isHeld: false})))
            setTenzies(!tenzies)
        }
        setDice((prevDice) =>
            prevDice.map((die) => {
                return die.isHeld ? die : generateNewDie();
            })
        );
    }

    function generateNewDie() {
        const randomNum = Math.floor(Math.random() * 6) + 1;
        return {
            value: randomNum,
            isHeld: false,
            id: nanoid(),
        };
    }

    return (
        <>
            <main className="main">
                {tenzies && <Confetti />}
                <h1 className="title">Tenzies</h1>
                <p className="instructions">
                    Roll until all dice are the same. Click each die to freeze
                    it at its current value between rolls.
                </p>
                <div className="container">{diceElements}</div>
                <button className="btn-dice" onClick={generateNewDice}>
                    {tenzies ? "New Game" : "Roll"}
                </button>

            </main>
        </>
    );
}

export default App;
