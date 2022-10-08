import {
  collection,
  doc,
  query,
  where,
  updateDoc,
  getDocs,
} from 'firebase/firestore'
import { db } from '.'
import { User } from '@/component/Top'

type UserItem = {
  name?: string
  url?: string
  isSelected?: boolean
}

export const getUsersByIsSelected = async (
  isSelected: boolean,
): Promise<User[]> => {
  const collectRef = collection(db, 'users')
  const docSnap = await getDocs(
    query(collectRef, where('isSelected', '==', isSelected)),
  )

  return docSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as User))
}

export const updateUser = async (id: string, data: UserItem): Promise<void> => {
  await updateDoc(doc(db, 'users', id), data)
}

export const resetUsers = async (): Promise<void> => {
  const collectRef = collection(db, 'users')
  const docSnap = await getDocs(
    query(collectRef, where('isSelected', '==', true)),
  )

  docSnap.forEach(
    async (doc) =>
      await updateUser(doc.id, {
        isSelected: false,
      }),
  )
}
