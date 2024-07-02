const DisplayResults = ({countries}) => {
    return (
        <div>
            {countries.map((countries, index) => 
                <p key={index}>{countries}</p>
            )}
        </div>
    )
}

export default DisplayResults