import { assertEquals, assertExists } from "jsr:@std/assert";
import { getSearchFilters, OSUSearchFilters } from "./mod.ts";
import testData from "./test_data.json" with { type: "json" }

// This test ensures that OSU has not changed the format of the search filters
Deno.test(async function getSearchFiltersTest(test) {
  let options: OSUSearchFilters | null = null
  await test.step("Fetch search filters", async () => {
    options = await getSearchFilters()
    assertExists(options)
  })

  await test.step({
    name: "Terms - All Terms unchanged",
    fn: () => {
      assertEquals(options!.terms["999999"], testData.terms["999999"])
    },
    ignore: options == null
  })
  await test.step({
    name: "Subjects - Any Subject unchanged",
    fn: () => {
      assertEquals(options!.subjects[""], testData.subjects[""])
    },
    ignore: options == null
  })
  await test.step({
    name: "Course Types - unchanged",
    fn: () => {
      assertEquals(options!.courseTypes, testData.courseTypes)
    },
    ignore: options == null
  })
  await test.step({
    name: "Campuses - Any Campus unchanged",
    fn: () => {
      assertEquals(options!.campuses[""], testData.campuses[""])
    },
    ignore: options == null
  })
});
