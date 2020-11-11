import { fromDefault } from "../../../Data/Record"

export interface Book {
  "@@name": "Book"
  id: string
  short: string
  name: string
  isCore: boolean
  isAdultContent: boolean
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Book =
  fromDefault ("Book")
              <Book> ({
                id: "",
                name: "",
                short: "",
                isCore: false,
                isAdultContent: false,
              })
