import { List } from "../../../../Data/List";
import { Maybe, Nothing } from "../../../../Data/Maybe";
import { fromDefault } from "../../../../Data/Record";
import { AllRequirementObjects } from "../wikiTypeHelpers";

export interface Application {
  id: number
  name: string
  prerequisites: Maybe<List<AllRequirementObjects>>
}

export const Application =
  fromDefault<Application> ({
    id: 0,
    name: "",
    prerequisites: Nothing,
  })