import React from 'react'

const ResourceBar = (props) => {
	return (
		<div>
			<ul>
				<li>{props.water}</li>
				<li>{props.food}</li>
				<li>{props.people}</li>
			</ul>
		</div>
	)
}
export default ResourceBar