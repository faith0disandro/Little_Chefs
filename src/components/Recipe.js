
const Recipe = ({title, calories, image, preptime, link}) => {
    return(
        /*<div className="recipe">
            <img src={image} alt=""/>
            <h1>{title}</h1>
            <o1>
                ingredients:
                {ingredients.map(ingredient =>(
                    <li>{ingredient.text}</li>
                ))}
            </o1>
            <o2>
                health labels:
                {healthlabels.map(healthlabel =>(
                    <li>{healthlabel}</li>
                ))}
            </o2>
            <p>calories: {calories}</p>
            <p>cuisin type: {cuisinetypes}</p>
            <p>preparation time: {preptime > 0 ? preptime : "N/A"}</p>
            {/*<iframe src={steps} title="description"></iframe>}
            <p>steps: {steps}</p>
        </div>*/

        <div className="recipe" onClick={() => window.open(link, "_blank")}>
            <img src={image} alt=""/>
            <h1>{title}</h1>
            <p><img src={require('../image/calorie_icon.png')} /> calories: {Math.round(calories)}</p>
            <p><img src={require('../image/timer_icon.png')} /> preparation time: {preptime > 0 ? preptime : "N/A"}</p>
        </div>
        
    );
}

export default Recipe;
