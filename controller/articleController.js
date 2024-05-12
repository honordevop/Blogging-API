const express = require("express");
const Article = require("../models/blogModel");
const { readingTime } = require("../utils/utils");

const createArticle = async (req, res, next) => {
  try {
    const { title, description, read_count, tags, body } = req.body;
    // create blog object
    const newArticle = new Article({
      title,
      description,
      tags,
      body,
      author: req.user._id,
      read_count,
      timestamp: Date.now(),
      reading_time: readingTime(body),
    });

    // save to database
    const createdArticle = await newArticle.save();
    //return response
    return res.status(201).json({
      status: true,
      data: createdArticle,
    });

    // return res.status(201).json(createArticle)
  } catch (error) {
    // console.log(error)
    next(error);
  }
};

const AllPublishedArticles = async (req, res, next) => {
  const { page, posts, author, title, tags, order_by, order } = req.query;
  try {
    const searchQuery = {
        state: "published",
      },
      sortQuery = {};
    let searchtags = {};

    //Pagination

    const startpage = !page ? 0 : page;
    const postsPerPage = !posts ? 20 : posts;
    const sortOrder = !order ? "asc" : order;
    const orderParams = !order_by ? "timestamp" : order_by;
    //Searching
    searchtags = !tags ? ["post"] : getTags(tags);
    if (author) {
      searchQuery.author = author;
    }
    if (title) {
      searchQuery.title = title.toLowerCase();
    }

    //Sorting

    sortParams = orderParams.split(",");
    for (const param of sortParams) {
      if (sortOrder == "asc" && order_by) {
        sortQuery[param] = 1;
      }
      if (sortOrder == "desc" && order_by) {
        sortQuery[param] = -1;
      }
      if (sortOrder == "desc" && order_by) {
        sortQuery[param] = -1;
      }
      if (sortOrder == "asc" && !order_by) {
        sortQuery[param] = 1;
      }
    }

    const articles = await Article.find({
      tags: { $in: searchtags },
      ...searchQuery,
    });
    return res.json({
      status: true,
      data: articles,
    });
  } catch (err) {
    err.source = "get published blogs controller";
    next(err);
  }
};

const PublishedArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const article = await Article.findById(id).populate("author", {
      firstname: 1,
    });

    // This code block ensure draft blog post are not fetched
    // if (article.state !== "published") {
    //   return res.status(403).json({
    //     status: true,
    //     error: "Requested article is not published",
    //   });
    // }

    // update blog read count
    article.read_count += 1;
    await article.save();

    return res.json({
      status: true,
      data: article,
    });
  } catch (err) {
    err.source = "get published article controller";
    next(err);
  }
};

const updatePubishedArticleState = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    // const { title, description, state,tags, body } = updates

    //const {updates} = await req.body;

    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({
        status: false,
        article: null,
      });
    }
    article.state = "published";

    await article.save();
    return res.status(200).json({
      status: true,
      message: "Article updated successfully",
      article: article,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const updatePubishedArticle = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description, tags, body } = req.body;

    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({
        status: false,
        article: null,
      });
    }
    article.title = title;
    article.tags = tags;
    article.description = description;
    article.body = body;

    await article.save();
    return res.status(200).json({
      status: true,
      message: "Article updated successfully",
      article: article,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const deletePublishedArticles = async (req, res) => {
  const { id } = req.params;

  const article = await Article.deleteOne({ _id: id });

  return res.json({ status: true, article });
};
module.exports = {
  createArticle,
  AllPublishedArticles,
  PublishedArticle,
  updatePubishedArticleState,
  updatePubishedArticle,
  deletePublishedArticles,
};
