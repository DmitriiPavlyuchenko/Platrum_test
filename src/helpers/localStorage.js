export const LOCALSTORAGE = {
  getItem (key) {
    try {
      return JSON.parse(localStorage.getItem(key) || '[]')
    } catch (e) {
      console.log('Error getting data in LS')
      return null
    }
  },

  setItem (key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
      console.log('Error saving data in LS')
    }
  }
}
