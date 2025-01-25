import React from 'react'

const Button = ({skill}) => {
    const [skills, setSkills] = React.useState(false)
    return (
        <button
            onClick={() => setSkills(!skills)}
            className={`px-3 py-1 rounded-full font-semibold text-sm ${skills && "text-white bg-gradient-to-br from-[#d24df7] to-[#7000f0] "}}`}
        >
            {skill}
        </button>
    )
}

export default Button