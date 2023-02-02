import axios from 'axios'
import Swal from 'sweetalert2'

const API_URL = process.env.REACT_APP_API_URL

const deleteObject = async (link: string): Promise<void> => {
  const {isConfirmed} = await Swal.fire({
    title: 'Are you sure?',
    icon: 'warning',
    showConfirmButton: true,
    showCancelButton: true,
  })

  if (isConfirmed) {
    return axios.delete(`${API_URL}/${link}`).then(() => {})
  }
}

export {deleteObject}
