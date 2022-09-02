// Write your code here
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

const VaccinationByGender = props => {
  const table = []
  const {apiData} = props
  const vaccination = apiData.vaccination_by_gender
  console.log(vaccination)
  const data = vaccination.map(eachItem =>
    table.push({
      count: eachItem.count,
      gender: eachItem.gender,
      Others: eachItem.Others,
    }),
  )
  console.log(data)
  return (
    <div className="byGender">
      <h1>Vaccination by gender</h1>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            cx="70%"
            cy="40%"
            data={table}
            startAngle={0}
            endAngle={180}
            innerRadius="40%"
            outerRadius="70%"
            dataKey="count"
          >
            <Cell name="Male" fill=" #f54394" />
            <Cell name="Female" fill="#5a8dee" />
            <Cell name="Others" fill=" #2cc6c6" />
          </Pie>
          <Legend
            className="pieChart"
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
export default VaccinationByGender
