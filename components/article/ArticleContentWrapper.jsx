"use client";

import { useEffect, useState } from "react";
import ArticleContent from "./ArticleContent";
import ArticleContentSkeleton from "./ArticleContentSkeleton";
import axios from "axios";

export default function ArticleContentWrapper({ slug }) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(null);
  const HOST = process.env.HOST;

  useEffect(() => {
    async function getArticle() {
      setLoading(true);
      try {
        const res = await axios.get(`${HOST}/articles/${slug}`);
        const data = res.data;
        setArticle(data);
        return;
      } catch (err) {
        console.warn("⚠️ API failed, using local data as fallback", err);
        try {
          const res = await axios.get(
            "http://localhost:3000/data/articles.json"
          );
          const data = res.data;
          const found = data.find((a) => a.slug === slug);
          setArticle(found);
          return;
        } catch (fallbackError) {
          console.error("❌ Fallback juga gagal:", fallbackError);
          return null;
        }
      }
    }

    getArticle();
  }, []);

  if (!article) {
    return <ArticleContentSkeleton />;
  }

  return <ArticleContent article={article} />;
}
