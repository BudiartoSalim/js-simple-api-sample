const express = require('express')
const app = express()
const PORT = 3000
const Database = require('./database')

app.use(express.json())

app.get('/chara', function (req, res) {
  const output = Database.getCharacterList()
  res.json(output)
})

app.get('/chara/:id', function (req, res) {
  const id = req.params.id
  const output = Database.getCharacterById(id)
  res.json(output)
})

app.post('/chara', function (req, res) {
  const payload = req.body
  console.log(payload)
  // ini validasi input yang oversimplified
  if (!payload.name) res.json({ message: "ERROR: name is mandatory" })
  if (!payload.power) res.json({ message: "ERROR: power is mandatory" })

  const output = Database.addNewCharacter(payload.name, payload.power)
  res.json({ message: "Added new character!", added_character: output })
})

app.put('/chara/:id', function (req, res) {
  const name = req.body.name
  const power = req.body.power
  const id = req.params.id

  const output = Database.editCharacter(id, name, power)
  if (output) res.json({ message: `Character with ID ${id} is edited successfully!`, new_chara_data: output })
  else res.json({ message: `Chara with ID ${id} does not exists!` })
})

app.delete('/chara/:id', function (req, res) {
  const id = req.params.id
  const output = Database.deleteCharacterById(id)
  const message = output ? `Successfully deleted a character!` : `Character with ID ${id} does not exists.`
  res.json({ message, deleted_character: output })
})


app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
})