import React, { useEffect, useState } from "react"; 

function Projects() { 
  const [projects, setProjects] = useState<any[]>([]); 
  const [velocityProject, setVelocityProject] = useState<any | null>(null);

  useEffect(() => { 
    fetch("https://tw.aykays.com/wp-json/wp/v2/projects?per_page=50&_fields=id,slug,acf,title,content") 
      .then((response) => response.json()) 
      .then((data) => { 
        console.log(data); 
        setProjects(data); 
        const v = Array.isArray(data) ? data.find((p: any) => {
          const t = p?.acf?.project_title || p?.title?.rendered || p?.slug;
          return typeof t === 'string' && t.toLowerCase().includes('velocity');
        }) : null;
        if (v) {
          setVelocityProject(v);
        } else {
          return fetch("https://tw.aykays.com/wp-json/wp/v2/projects?slug=velocity&_fields=id,slug,acf,title,content")
            .then((r) => r.json())
            .then((arr) => {
              if (Array.isArray(arr) && arr.length > 0) setVelocityProject(arr[0]);
            });
        }
      }) 
      .catch((error) => console.error("Error:", error)); 
  }, []); 
  return (
    <div style={{ padding: 24 }}>
      {!velocityProject && projects.length === 0 && <div>No projects found.</div>}
      {velocityProject ? (() => {
        const acf = velocityProject.acf || {};
        const img =
          acf.hero_image?.url ||
          acf.hero_image ||
          acf.project_image?.url ||
          acf.project_image ||
          acf.cover?.url ||
          acf.cover ||
          '';
        return (
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 1400,
              margin: '0 auto',
              aspectRatio: '16/9',
              backgroundImage: img ? `url(${img})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: 12,
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.35)'
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 32,
                bottom: 32,
                color: '#fff',
                maxWidth: '60%'
              }}
            >
              <div style={{ fontSize: 56, fontWeight: 800, letterSpacing: -1, textTransform: 'uppercase' }}>
                {acf.project_title || 'Velocity'}
              </div>
              <div style={{ marginTop: 12, fontSize: 18, opacity: 0.9 }}>
                {acf.project_brief}
              </div>
              <div style={{ marginTop: 16, fontFamily: 'monospace', fontSize: 14, opacity: 0.8 }}>
                Year: {acf.project_year}
              </div>
            </div>
          </div>
        );
      })() : <div>Velocity project not found.</div>}
    </div>
  ); 
} 

export default Projects; 
