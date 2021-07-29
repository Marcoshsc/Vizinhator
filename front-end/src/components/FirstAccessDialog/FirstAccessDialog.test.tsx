import { render } from "@testing-library/react"
import React from "react"
import FirstAccessDialog from "."
import styles from "./FirstAccessDialog.module.scss"

it("Render all the dialog descriptive items", () => {
  const { getByText } = render(<FirstAccessDialog />)
  const testForText = (text: string) => {
    const firstElement = getByText(text)
    expect(firstElement).not.toBeNull()
    expect(firstElement.parentElement).not.toBeNull()
    const parentElement = firstElement.parentElement as HTMLElement
    expect(parentElement.className).toBe(styles["content-div-item"])
    expect(parentElement.parentElement?.className).toBe(styles["content-div"])
    expect(parentElement.getElementsByTagName("svg").length).toBe(1)
  }
  testForText(
    "Here you can find and communicate with your neighbours in a simple way."
  )
  testForText(
    "See who are your neighbours, be notified when new neighbours are registered."
  )
  testForText(
    "You can also help and be helped by your neighbours, using a powerful communication system."
  )
  testForText(
    "Hide your confidential information and show only for your trusted neighbours."
  )
})
