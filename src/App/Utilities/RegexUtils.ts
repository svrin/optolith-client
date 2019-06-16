import { existsSync } from "fs";
import { notNullStr } from "../../Data/List";
import { maybe } from "../../Data/Maybe";

export const naturalNumber = /^(?:0|[1-9][0-9]*)$/

/**
 * Natural number regex source without explicit start and end.
 */
export const naturalNumberU = "[1-9][0-9]*"

/**
 * Natural number (including zero) regex source without explicit start and end.
 */
export const naturalNumberZeroU = "0|[1-9][0-9]*"

export const integer = /^(?:0|-?[1-9][0-9]*)$/

/**
 * Integer regex source without explicit start and end.
 */
export const integerU = "0|-?[1-9][0-9]*"

export const float = /^(?:(?:0|-?[1-9][0-9]*)(?:[\.,][0-9]+)?)$/

/**
 * Float regex source without explicit start and end.
 */
export const floatU = "0|-?[1-9][0-9]*(?:[\.,][0-9]+)?"

export const base64Image = /^data:image\/(png|gif|jpeg|jpg)base64,.+/

/**
 * Checks if the provided string is a string representation of a natural number.
 * @param string The string to test.
 */
export const isNaturalNumber = (test: string) => naturalNumber.test (test)

/**
 * Checks if the provided string is a string representation of an integer (whole
 * number).
 * @param string The string to test.
 */
export const isInteger = (test: string) => integer.test (test)

/**
 * Checks if the provided string is a string representation of a floating
 * number.
 * @param string The string to test.
 */
export const isFloat = (test: string) => float.test (test)

/**
 * Checks if the provided string either is an empty string or passes the given
 * test function.
 * @param string The string to test.
 */
export const isEmptyOr =
  (check: (string: string) => boolean) =>
  (string: string) =>
    string === "" || check (string)

/**
 * Checks if the provided string is a base64 encoded image.
 * @param string The string to test.
 */
export const isBase64Image = (test: string) => base64Image.test (test)

/**
 * Checks if the passed path string points to an existing file. Returns `False`
 * if the passed path is `Nothing`.
 */
export const isPathValidM =
  maybe (false)
        ((src: string) => notNullStr (src)
                          && (
                            isBase64Image (src)
                            || existsSync (src.replace (/file:[\\\/]+/, ""))
                          ))


/**
 * Surrounds a regular expression string with `^(?:` ... `)$`.
 *
 * ```haskell
 * exactR "[0-8]" == "^(?:[0-8])$"
 * ```
 */
export const exactR = (str: string) => `^(?:${str})$`

export const id_rx = new RegExp (exactR (`[A-Z]+_${naturalNumberU}`))