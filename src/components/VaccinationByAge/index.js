// Write your code here
// Write your code here
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const table = []
  const {apiData} = props
  const vaccination = apiData.vaccination_by_age
  console.log(vaccination)
  const data = vaccination.map(eachItem =>
    table.push({
      count: eachItem.count,
      age: eachItem.age,
    }),
  )
  console.log(data)
  return (
    <div className="byGender">
      <h1>Vaccination by Age</h1>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            cx="70%"
            cy="50%"
            data={table}
            startAngle={0}
            endAngle={360}
            innerRadius="0%"
            outerRadius="100%"
            dataKey="count"
          >
            <Cell name="18-44" fill="#2d87bb" />
            <Cell name="44-60" fill=" #a3df9f" />
            <Cell name="above 60" fill="#64c2a6" />
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            horizontalAlign="middle"
            align="right"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
export default VaccinationByAge
