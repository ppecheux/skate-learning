const fetch = require('node-fetch')
const parse = require('csv-parse/lib/sync')
const gql = require('graphql-tag')
const fs = require('fs')


export const getSeedMutations = async () => {
  /*   const res = await fetch(
      'https://cdn.neo4jlabs.com/data/grandstack_businesses.csv'
    ) */
  /*   const body = await res.text()
  */
  const body = fs.readFileSync("src/seed/grandstack_businesses.csv")
  const records = parse(body, { columns: true })
  const mutations = generateMutations(records)

  return mutations
}

const generateMutations = (records) => {
  return records.map((rec) => {
    Object.keys(rec).map((k) => {
      if (k === 'latitude' || k === 'longitude' || k === 'reviewStars') {
        rec[k] = parseFloat(rec[k])
      } else if (k === 'reviewDate') {
        const dateParts = rec[k].split('-')
        rec['year'] = parseInt(dateParts[0])
        rec['month'] = parseInt(dateParts[1])
        rec['day'] = parseInt(dateParts[2])
      } else if (k === 'categories') {
        rec[k] = rec[k].split(',')
      }
    })

    return {
      mutation: gql`
        mutation mergeReviews(
          $userId: ID!
          $userName: String
          $businessId: ID!
          $businessName: String
          $businessCity: String
          $businessState: String
          $businessAddress: String
          $latitude: Float
          $longitude: Float
          $reviewId: ID!
          $reviewText: String
          $year: Int
          $month: Int
          $day: Int
          $reviewStars: Float
          $categories: [String!]!
        ) {
          user: MergeUser(userId: $userId, name: $userName) {
            userId
          }
          business: MergeBusiness(
            businessId: $businessId
            name: $businessName
            address: $businessAddress
            city: $businessCity
            state: $businessState
            location: { latitude: $latitude, longitude: $longitude }
          ) {
            businessId
          }
          review: MergeReview(
            reviewId: $reviewId
            text: $reviewText
            date: { year: $year, month: $month, day: $day }
            stars: $reviewStars
          ) {
            reviewId
          }
          reviewUser: MergeReviewUser(
            from: { userId: $userId }
            to: { reviewId: $reviewId }
          ) {
            from {
              userId
            }
          }
          reviewBusiness: MergeReviewBusiness(
            from: { reviewId: $reviewId }
            to: { businessId: $businessId }
          ) {
            from {
              reviewId
            }
          }
          businessCategories: mergeBusinessCategory(
            categories: $categories
            businessId: $businessId
          ) {
            businessId
          }
        }
      `,
      variables: rec,
    }
  })
}

export const getSeedMutationsFigure = async () => {
  const body = fs.readFileSync("src/seed/grandstack_figures.csv")
  const records = parse(body, { columns: true })
  const mutations = generateMutationsFigure(records)

  return mutations
}

const generateMutationsFigure = (records) => {
  return records.map((rec) => {
    Object.keys(rec).map((k) => {
      if (k === 'aliases') {
        rec[k] = rec[k].split(',')
      }
    })

    return {
      mutation: gql`
        mutation mergeFigure(
          $name: String!
          $aliases: [String]
        ) {
          figure: MergeFigure(name: $name, aliases: $aliases) {
            name
          }
        }
      `,
      variables: rec,
    }

  })
}
