export default function Die(props) {
    const styles = { backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF" };
    return (
        <div
            className="dice-face"
            style={styles}
            onClick={() => props.holdDice(props.id)}
        >
            <h2 className="dice-num">{props.value}</h2>
        </div>
    );
}
