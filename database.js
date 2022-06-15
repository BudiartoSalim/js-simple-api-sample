const fs = require('fs')
const character_db = './character_db.json'

class Database {
  static getCharacterList() {
    const data = JSON.parse(fs.readFileSync(character_db))
    return data
  }

  static getCharacterById(id) {
    const data = JSON.parse(fs.readFileSync(character_db))
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == id) return data[i]
    }
  }

  static addNewCharacter(name, power) {
    let data = JSON.parse(fs.readFileSync(character_db))

    const lastId = data[data.length - 1].id
    const newEntry = {
      id: lastId + 1,
      name: name,
      power: power
    }

    data.push(newEntry)
    fs.writeFileSync(character_db, JSON.stringify(data, null, 2))

    return newEntry
  }

  static editCharacter(id, name, power) {
    const data = JSON.parse(fs.readFileSync(character_db))
    let editedChara
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == id) {
        if (name) data[i].name = name
        if (power) data[i].power = power
        editedChara = data[i]
        break
      }
    }

    fs.writeFileSync(character_db, JSON.stringify(data, null, 2))
    return editedChara
  }

  static deleteCharacterById(id) {
    let data = JSON.parse(fs.readFileSync(character_db))
    let result = []

    let deletedData
    for (let i = 0; i < data.length; i++) {
      if (data[i].id != id) result.push(data[i])
      else deletedData = data[i]
    }

    fs.writeFileSync(character_db, JSON.stringify(result, null, 2))
    return deletedData
  }

}

module.exports = Database
